/*
  # Fix Auth Settings

  1. Updates
    - Disable email confirmations
    - Set proper auth settings
    - Add auth policies
  
  2. Security
    - Allow signups
    - No email confirmation required
    - Password auth enabled
*/

-- Update auth settings
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Update auth config
UPDATE auth.config SET 
  enable_signup = true,
  enable_confirmations = false,
  mailer_autoconfirm = true,
  sms_autoconfirm = true,
  jwt_exp = 3600,
  code_exp = 24 * 3600;

-- Add RLS policies for auth.users
CREATE POLICY "Users can read own data"
  ON auth.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON auth.users
  FOR UPDATE
  USING (auth.uid() = id);