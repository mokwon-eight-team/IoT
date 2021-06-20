const mongoose = require('mongoose');

var InfraredSchema = mongoose.Schema({   //스키마(Schema) 설정
  infraredId: {type: Number, require:true},
  state: { type: String, require: true},
});

module.exports = mongoose.model('Infrared', InfraredSchema); //소문자화 후 복수형으로 바꾸어 infrareds 컬렉션이 됨
