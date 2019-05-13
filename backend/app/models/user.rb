class User < ActiveRecord::Base
  # has_many :user_recipes
  # has_many :recipes, through: :user_recipes
  # has_many :user_ingredients
  # has_many :ingredients, through: :user_ingredients

  has_secure_password

  validates :username, uniqueness: true
  validates :first_name, presence: true
end
