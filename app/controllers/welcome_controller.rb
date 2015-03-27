class WelcomeController < ApplicationController
 skip_before_action :verify_authenticity_token

  def index
  end

  def todolist
    render json: Todo.all
  end

  def add
    todo = Todo.create!(description: params[:description], done: params[:done])
    render json: todo
  end
end