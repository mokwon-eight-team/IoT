const Infrared = require('./infrared.model.js');

// 새로운 연락처 만들기
exports.create = (req, res) => {
  const contact = new Infrared({ 
    infraredId: req.body.infraredId,
    state: req.body.state
  });
  
  //데이터베이스에 새로운 연락처 저장하기 
  contact.save()
  .then(data => { res.send(data); })
  .catch(err => { 
    res.status(500).send({ message: err.message}); 
  });
};


//모든 연락처 검색
exports.findAll = (req, res) => {
  Infrared.find()
  .then( contacts => { 
	res.send(contacts);
	console.log(contacts)	//test log
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};

//특정한 연락처 검색
exports.findOne = (req, res) => {
  Infrared.findOne({infraredId : req.params.infraredId})
  .then( contact => {
    if(!contact){
      return res.status(404).send({
        message: req.params.infraredId + "에 해당하는 정보가 없습니다." }); 
    }
    res.send(contact);
  }).catch(err => { 
    return res.status(500).send({ message: req.params.contactId +" 로 검색 중 에러 발생" });
  });  
};

//업데이트
exports.update = (req, res) => { 
  Infrared.findOneAndUpdate( {infraredId:req.params.infraredId}, 
    { infraredId: req.body.infraredId, state:req.body.state}, 
    {new:true}
  )
  .then(contact => { 
    if(!contact) {
      return res.status(404).send({ message: req.params.infraredId +
        "에 해당하는 연락처(contact) 발견되지 않았습니다." })
    }
    res.send(contact);
  }).catch(err => { 
    return res.status(500).send({ message: err.message });
  });
};

//삭제
exports.delete = (req, res) => {
  Infrared.findOneAndDelete({infraredId:req.params.infraredId})
  .then(contact => {
    if(!contact) {
      return res.status(404).send({ message: req.params.infraredId +"에 해당하는 정보가 없습니다." })
    }
    res.send({ message: "정상적으로 " + req.params.infraredId + " 정보가 삭제되었습니다." })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message }); 
  });
};