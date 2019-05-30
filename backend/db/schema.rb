# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_15_191915) do

  create_table "areas", force: :cascade do |t|
    t.integer "city_id"
    t.string "name"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_areas_on_city_id"
  end

  create_table "attractions", force: :cascade do |t|
    t.integer "area_id"
    t.string "name"
    t.string "latitude"
    t.string "longitude"
    t.string "place_id"
    t.string "address"
    t.string "hours"
    t.string "cost"
    t.string "classification"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id"], name: "index_attractions_on_area_id"
  end

  create_table "cities", force: :cascade do |t|
    t.integer "itinerary_id"
    t.string "name"
    t.string "country"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["itinerary_id"], name: "index_cities_on_itinerary_id"
  end

  create_table "itineraries", force: :cascade do |t|
    t.text "title"
    t.text "vital_info"
    t.text "helpful_info"
    t.text "notes"
    t.text "description"
    t.text "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "plans", force: :cascade do |t|
    t.integer "city_id"
    t.date "date"
    t.string "time"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_plans_on_city_id"
  end

  create_table "user_itineraries", force: :cascade do |t|
    t.integer "user_id"
    t.integer "itinerary_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["itinerary_id"], name: "index_user_itineraries_on_itinerary_id"
    t.index ["user_id"], name: "index_user_itineraries_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.text "username"
    t.text "name"
    t.text "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
