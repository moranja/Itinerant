class CreateCities < ActiveRecord::Migration[5.2]
  def change
    create_table :cities do |t|
      t.belongs_to :itinerary, foreign_key: {on_delete: :cascade}
      t.string :name
      t.string :country
      t.text :content

      t.timestamps
    end
  end
end
