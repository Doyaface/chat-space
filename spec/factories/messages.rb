FactoryBot.define do
  factory :message do
    body { Faker::Food.dish }
    image { File.open("#{Rails.root}/public/images/no_image.jpg") }
    user
    group
  end
end