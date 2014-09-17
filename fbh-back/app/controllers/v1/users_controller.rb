module V1
	class UsersController < ApplicationController
		def index
			render json: true
		end
	end
end