class CreateAttractions < ActiveRecord::Migration[5.2]
  def change
    create_table :attractions do |t|
      t.belongs_to :area, foreign_key: {on_delete: :cascade}
      t.string :name
      t.string :latitude
      t.string :longitude
      t.string :place_id
      t.string :address
      t.string :hours
      t.string :cost
      t.string :classification
      t.string :description

      t.timestamps
    end
  end
end
