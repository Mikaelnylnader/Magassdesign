/*
  # Add email tracking system

  1. New Table
    - `email_logs`
      - Track all sent emails
      - Store email content and metadata
      - Link to users and orders when applicable
  
  2. Security
    - Enable RLS
    - Only allow admin access to full email logs
    - Users can only see their own email history
*/

-- Create email type enum
CREATE TYPE email_type AS ENUM (
  'welcome',
  'order_confirmation',
  'shipping_update',
  'order_status'
);

-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_type email_type NOT NULL,
  recipient_email text NOT NULL,
  recipient_name text,
  subject text NOT NULL,
  content text NOT NULL,
  metadata jsonb,
  user_id uuid REFERENCES auth.users,
  order_id uuid REFERENCES orders,
  sent_at timestamptz DEFAULT now(),
  status text DEFAULT 'sent',
  error_message text
);

-- Enable RLS
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own email logs"
  ON email_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all email logs"
  ON email_logs
  FOR ALL
  USING (auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'admin'
  ));

-- Create index for better query performance
CREATE INDEX email_logs_user_id_idx ON email_logs(user_id);
CREATE INDEX email_logs_order_id_idx ON email_logs(order_id);
CREATE INDEX email_logs_email_type_idx ON email_logs(email_type);
CREATE INDEX email_logs_sent_at_idx ON email_logs(sent_at); 