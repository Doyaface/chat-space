class Api::MessagesController < ApplicationController
  def index
    binding.pry
    @newmessages = @messages.where(id > ?,params[:message][:id])
  end
end