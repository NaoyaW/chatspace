class AddIndexToScores < ActiveRecord::Migration
  def change
    add_index :scores,  :name
  end
end
