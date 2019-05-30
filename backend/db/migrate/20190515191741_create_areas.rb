class CreateAreas < ActiveRecord::Migration[5.2]
  def change
    create_table :areas do |t|
      t.belongs_to :city, foreign_key: {on_delete: :cascade}
      t.string :name
      t.text :content

      t.timestamps
    end
  end
end
