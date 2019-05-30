class CreateUserItineraries < ActiveRecord::Migration[5.2]
  def change
    create_table :user_itineraries do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :itinerary, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
