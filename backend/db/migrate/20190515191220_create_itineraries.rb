class CreateItineraries < ActiveRecord::Migration[5.2]
  def change
    create_table :itineraries do |t|
      t.text :title
      t.text :vital_info
      t.text :helpful_info
      t.text :notes

      t.timestamps
    end
  end
end
