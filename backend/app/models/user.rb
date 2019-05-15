class User < ActiveRecord::Base
  has_many :user_itineraries
  has_many :itineraries, through: :user_itineraries

  has_secure_password

  validates :username, uniqueness: true
  validates :name, presence: true
end
