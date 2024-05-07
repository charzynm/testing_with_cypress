# testing_with_cypress
# installing linux dependencies
# Install Xvfb and other necessary packages:
sudo apt-get update
sudo apt-get install -y xvfb gtk2-engines-pixbuf
sudo apt-get install -y xfonts-cyrillic xfonts-100dpi xfonts-75dpi xfonts-base xfonts-scalable
sudo apt-get install -y dbus-x11

#  Xvfb to run in the background:
Xvfb :99 -ac &
export DISPLAY=:99

# Install Cypress dependencies:
sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4
sudo apt-get install -y libnss3 libxss1 libasound2 libxtst6 xauth

# Run Cypress tests:
npx cypress run
