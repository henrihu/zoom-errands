# config valid only for current version of Capistrano
lock "3.8.0"

set :application, "zoomerrands_provider"
set :user,        'ubuntu'
set :repo_url, "git@bitbucket.org:calimike/zoom-errands.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/ubuntu/#{fetch(:application)}"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
set :pty, true
set :use_sudo,        true
set :ssh_options, {
  forward_agent: true,
  auth_methods: ["publickey"],
  keys: ["../newmikezoom.pem"]
}

set :stage,           :production
# Default value for :linked_files is []
# append :linked_files, "app/scripts/config.js", "app/scripts/constants.js"

# Default value for linked_dirs is []
append :linked_dirs,  "node_modules", "bower_components"

set :nvm_type, :user # or :system, depends on your nvm setup
set :nvm_node, 'v5.0.0'
set :nvm_map_bins, %w{node npm yarn}

set :default_env, {
  path: [
    # "/usr/local/rbenv/shims",
    "#{shared_path}/node_modules/bower/bin",
    "#{shared_path}/node_modules/grunt-cli/bin",
    # "/usr/local/rbenv/versions/#{fetch(:rbenv_ruby)}/bin",
    "/home/ubuntu/.nvm/versions/node/v5.0.0/bin",
    "$PATH"].join(":")
}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do

    end
  end

  task :bower_and_npm_install do
    on roles(:app), in: :sequence, wait: 5 do
      within release_path do
        # unless test "[ -d #{File.join(current_path, 'node_modules', 'grunt-cli', 'bin')} ]"
        #   execute :npm, "install yo"
        # end
        execute :npm, "install"
        execute :bower, "install"
      end
    end
  end

  task :build do
    on roles(:app), in: :sequence, wait: 5 do
      within release_path do
        execute :gulp, "build"
      end
    end
  end

  desc "upload files"
  task :copy do
    on roles(:all) do |host|
      # Distributes config files to remote servers
      # Skips hosts where file exists:
      # cap dev1 -S local_file="file.yml" -S remote_file="/apps/showmojo/shared/config/file.yml" config:distribute

      # Overwrites existing files
      # cap dev1 -S local_file="file.yml" -S remote_file="/apps/showmojo/shared/config/file.yml" -S force=true config:distribute
      filename = "app/scripts/config.js"
      local_file = "/home/janies/work/angular/zoomerrands/zoomerrands_frontend/#{filename}"
      remote_file = "/home/ubuntu/rails/shared/config/#{filename}"
      # force = fetch(:force, false)
      # options = { via: :scp }

      # unless force
      #   options.merge!(hosts: hosts_without_file(remote_file) )
      # end

      upload!(local_file, remote_file)
      # upload! '/tmp/dnslist/list-1-6.csv', '/tmp/dnslist/list-1-6.csv'

    end
  end

  after :bower_and_npm_install, :build
  after :publishing, :restart
  after :published, :bower_and_npm_install
end