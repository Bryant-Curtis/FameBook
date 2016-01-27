# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all

gintoki = User.create!(first_name: "Gintoki", last_name: "Sakata", email: "gintoki@sakata.com", password: "sakata")
naruto = User.create!(first_name: "Naruto", last_name: "Uzumaki", email: "naruto@uzumaki.com", password: "uzumaki")
vegeta = User.create!(first_name: "Vegeta", last_name: "Breigh", email: "vegeta@breigh.com", password: "breigh")
cloud = User.create!(first_name: "Cloud", last_name: "Strife", email: "cloud@strife.com", password: "strife")
zidane = User.create!(first_name: "Zidane", last_name: "Tribal", email: "zidane@tribal.com", password: "tribal")
lance = User.create!(first_name: "Lance", last_name: "Armstrong", email: "lance@armstrong.com", password: "armstrong")
alexander = User.create!(first_name: "Alexander", last_name: "Hamilton", email: "alexander@hamilton.com", password: "hamilton")
musashi = User.create!(first_name: "Musashi", last_name: "Miyamoto", email: "musashi@miyamoto.com", password: "miyamoto")
julius = User.create!(first_name: "Julius", last_name: "Caesar", email: "julius@caesar.com", password: "caesar")
oprah = User.create!(first_name: "Oprah", last_name: "Winfrey", email: "oprah@winfrey.com", password: "winfrey")
george = User.create!(first_name: "George", last_name: "Clooney", email: "george@clooney.com", password: "clooney")
robert = User.create!(first_name: "Robert", last_name: "De Niro", email: "robert@deniro.com", password: "deniro")
