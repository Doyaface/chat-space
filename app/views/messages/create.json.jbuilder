json.(@message, :content, :image)
json.created_at format_posted_time(@message.created_at)
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id
