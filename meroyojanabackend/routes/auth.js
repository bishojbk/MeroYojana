import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import pool from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Login route
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        })
      }

      const { username, password } = req.body

      // Find user by username or email
      const result = await pool.query(
        `SELECT id, username, email, password, role, office_type, office_name, 
         jurisdiction, is_active 
         FROM users 
         WHERE (username = $1 OR email = $1) AND is_active = true`,
        [username]
      )

      if (result.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        })
      }

      const user = result.rows[0]

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        })
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          role: user.role
        },
        process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        { expiresIn: '24h' }
      )

      // Log login action
      await pool.query(
        `INSERT INTO audit_logs (user_id, action, ip_address)
         VALUES ($1, $2, $3)`,
        [user.id, 'LOGIN', req.ip || req.connection.remoteAddress]
      )

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: userWithoutPassword
      })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
  }
)

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, username, email, role, office_type, office_name, 
       jurisdiction, is_active, created_at 
       FROM users 
       WHERE id = $1`,
      [req.user.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      user: result.rows[0]
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// Logout route (client-side token removal, but we log it)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    await pool.query(
      `INSERT INTO audit_logs (user_id, action, ip_address)
       VALUES ($1, $2, $3)`,
      [req.user.userId, 'LOGOUT', req.ip || req.connection.remoteAddress]
    )

    res.json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

export default router

