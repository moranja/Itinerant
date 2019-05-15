class CreatePlans < ActiveRecord::Migration[5.2]
  def change
    create_table :plans do |t|
      t.belongs_to :city, foreign_key: true
      t.belongs_to :itinerary, foreign_key: true
      t.boolean :brief
      t.date :date
      t.string :time
      t.string :content

      t.timestamps
    end
  end
end
