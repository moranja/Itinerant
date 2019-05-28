class User < ActiveRecord::Base
  has_many :user_itineraries
  has_many :itineraries, through: :user_itineraries

  has_secure_password

  validates :username, uniqueness: true
  validates :name, presence: true

  def itinerary_list
    return self.itineraries.map{|i| {id: i.id, title: i.title, description: i.description, image_url: i.image_url}}
  end


  def auth_token
    JWT.encode({ id: self.id }, 'super-secret-password')
  end

  def as_json(*)
    super.except('password_digest')
  end
end
