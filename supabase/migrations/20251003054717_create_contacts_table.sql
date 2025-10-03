/*
  # Create contacts table

  ## Overview
  Creates a contacts table to store contact information including names, phone numbers, emails, and contact types.

  ## 1. New Tables
    - `contacts`
      - `id` (uuid, primary key) - Unique identifier for each contact
      - `name` (text, required) - Contact's full name
      - `phone_number` (text, required) - Contact's phone number
      - `email` (text, optional) - Contact's email address
      - `is_favourite` (boolean) - Whether the contact is marked as favourite (default: false)
      - `contact_type` (text, required) - Type of contact (e.g., work, personal, other)
      - `created_at` (timestamptz) - Timestamp when the contact was created
      - `updated_at` (timestamptz) - Timestamp when the contact was last updated

  ## 2. Security
    - Enable Row Level Security (RLS) on `contacts` table
    - Add policy for authenticated users to view all contacts
    - Add policy for authenticated users to insert contacts
    - Add policy for authenticated users to update contacts
    - Add policy for authenticated users to delete contacts

  ## 3. Notes
    - All timestamps are automatically managed
    - Email is optional to accommodate contacts without email addresses
    - contact_type field allows categorization of contacts
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone_number text NOT NULL,
  email text,
  is_favourite boolean DEFAULT false,
  contact_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert contacts"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (true);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
