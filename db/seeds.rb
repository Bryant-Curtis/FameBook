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

Post.destroy_all

g1 = Post.create!(body: "What a boring day. Why can't something more, you know, exciting happen? haaa....", author_id: gintoki.id)
g2 = Post.create!(body: "漫画は読者と一緒に作ってくもんだろーが！", author_id: gintoki.id)
g3 = Post.create!(body: "人生を楽しく生きるコツは童心を忘れねーことだよ。", author_id: gintoki.id)
g4 = Post.create!(body: "皮肉なもんだな。ホントに大事なモンってのは　もってる奴よりもってねー奴の方がしってるもんさ", author_id: gintoki.id)
n1 = Post.create!(body: "言ったことは、まげねぇ。・・・それが俺の忍道だ！！", author_id: naruto.id)
n2 = Post.create!(body: "賢いっていうのがそういう事なら、俺は一生バカでいい。", author_id: naruto.id)
n3 = Post.create!(body: "やっぱ覚悟しとかなきゃな…みんながみんな認めてくれる火影ってスゲー名前語るのによーお。ぜってェー！近道なんかねェーってことはよ！！", author_id: naruto.id)
v1 = Post.create!(body: "トランクス・・・おまえは赤ん坊の頃からいちども抱いてやったことがなかったな・・・抱かせてくれ・・・", author_id: vegeta.id)
v2 = Post.create!(body: "がんばれカカロット お前がナンバーワンだ！", author_id: vegeta.id)
c1 = Post.create!(body: "おれたちは・・・どうしたらいい？この痛みをどうしたらいい！？", author_id: cloud.id)
c2 = Post.create!(body: "興味ないね", author_id: cloud.id)
c3 = Post.create!(body: "エアリスはもうしゃべらない・・・", author_id: cloud.id)
z1 = Post.create!(body: "助かったんじゃないさ 生きようとしたんだ いつか帰るところに帰るために", author_id: zidane.id)
z2 = Post.create!(body: "誰かを助けるのに理由がいるかい？", author_id: zidane.id)
# z3 = Post.create!(body: "You don't need a reason to help people.", author_id: zidane.id)
z4 = Post.create!(body: "I shall hereby do my best to kidnap you!", author_id: zidane.id)
z5 = Post.create!(body: "Whoever pulled this off had to be highly skilled, like me.", author_id: zidane.id)


l = Post.create!(body: "", author_id: lance.id)
a1 = Post.create!(body: "There are seasons in every country when noise and impudence pass current for worth; and in popular commotions especially, the clamors of interested and factious men are often mistaken for patriotism.", author_id: alexander.id)
a2 = Post.create!(body: "Those who stand for nothing fall for anything.", author_id: alexander.id)
a3 = Post.create!(body: "I never expect to see a perfect work from an imperfect man.", author_id: alexander.id)
a4 = Post.create!(body: "In framing a government which is to be administered by men over men, the great difficulty lies in this: you must first enable the government to control the governed; and in the next place, oblige it to control itself.", author_id: alexander.id)
m = Post.create!(body: "", author_id: musashi.id)
j = Post.create!(body: "", author_id: julius.id)
o1 = Post.create!(body: "The more you praise and celebrate your life, the more there is in life to celebrate.", author_id: oprah.id)
o2 = Post.create!(body: "Think like a queen. A queen is not afraid to fail. Failure is another steppingstone to greatness.", author_id: oprah.id)
o3 = Post.create!(body: "Do the one thing you think you cannot do. Fail at it. Try again. Do better the second time. The only people who never tumble are those who never mount the high wire. This is your moment. Own it.", author_id: oprah.id)
g = Post.create!(body: "", author_id: george.id)
r = Post.create!(body: "", author_id: robert.id)
