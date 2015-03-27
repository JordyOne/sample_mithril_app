class Todo < ActiveRecord::Base

  def self.todos
    Todo.all
  end
end

