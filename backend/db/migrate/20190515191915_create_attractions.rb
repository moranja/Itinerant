class CreateAttractions < ActiveRecord::Migration[5.2]
  def change
    create_table :attractions do |t|
      t.belongs_to :area, foreign_key: true
      t.string :name
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
