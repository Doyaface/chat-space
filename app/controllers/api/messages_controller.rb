class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    @new_message = Message.where("group_id = ? and id > ?",params[:group_id],params[:id])
      respond_to do |format|
        format.html
        format.json 
      end
  end
end
