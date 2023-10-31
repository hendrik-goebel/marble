const fs = require('fs');

const dir = './public/samples';

fs.readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }

 let sounds = {}
  files.forEach(file => {
    if (file.endsWith('.ogg')) {
      sounds[file.replace(/\.ogg$/, '', file)] = 'samples/' + file
    }
  });

  sounds['silence'] = ''

  fs.writeFile('public/js/sounds.json', JSON.stringify(sounds), function (err) {
    if (err) return console.log(err);
    console.log('sounds file written');
  });
});