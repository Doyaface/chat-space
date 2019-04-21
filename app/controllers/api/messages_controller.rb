class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all

    respond_to do |format|
      format.html
      format.json {@newmessages = Message.where("id > ?",params[:message][:id])}
    end
    
  end
end