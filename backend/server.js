const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path');
const helmet = require('helmet');
var db

// Remember to change YOUR_USERNAME and YOUR_PASSWORD to your username and password! 
MongoClient.connect('mongodb://159.138.146.96:27017/bad', (err, database) => {
  if (err) return console.log(err)
  db = database.db('bad')
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(helmet());

const directory = path.resolve(__dirname, './dist/bad/');
app.use(express.static(directory));
app.get('/*', (req, res, next) => {
  res.sendFile(directory);
});

app.use(cors())

app.get('/members', (req, res) => {
  db.collection('members').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result);
  })
})

app.get('/total-join', (req, res) => {
  db.collection('members').find().toArray((err, result) => {
    if (err) return console.log(err)
    var newArray = result.filter(function (el) {
      return el.isJoin === true
    });
    res.send({ total: newArray.length });
  })
})

app.get('/teams', async (req, res) => {
  const resData = await new Promise(async (resolve, reject) => {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    const data = await db.collection('match').find({
      createAt: {
        $gte: date,
        $lt: new Date()
      }
    }).toArray();
    if (data.length > 0) {
      resolve(data[0]);
    } else {
      resolve([]);
    }
  })
  res.send(resData);
})

app.get('/generate-team', async (req, res) => {
  const resData = await new Promise(async (resolve, reject) => {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    const data = await db.collection('match').find({
      createAt: {
        $gte: date,
        $lt: new Date()
      }
    }).toArray();
    if (data.length > 0) {
      resolve(data[0]);
    } else {
      await db.collection('members').find().toArray(async (err, result) => {
        var newArray = result.filter(function (el) {
          return el.isJoin === true
        });
        const matchDetail = await getGenerateTeam(newArray);
        db.collection('match').save(matchDetail, function (err, res) {
          resolve(matchDetail);
        });
      })
    }
  })

  res.send(resData);
})

app.post('/add-member', async (req, res) => {
  await db.collection('members').save(req.body, function (err, res) {
  });
  res.send(true);
})

app.post('/member-join', async (req, res) => {
  await db.collection('members').updateOne({ name: req.body.name }, { $set: { isJoin: req.body.isJoin } }, function (err, res) {
  });
  res.send(true);
})


async function getGenerateTeam(memberList) {
  responseData = await generateTeam(memberList);
  const matchDetail = { teamA: { score: 0, teamMember: responseData.teamA, totalStrategy: responseData.totalStrategyA }, teamB: { score: 0, teamMember: responseData.teamB, totalStrategy: responseData.totalStrategyB }, createAt: new Date() }
  return matchDetail;
}

function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
    var j = i + Math.floor(Math.random() * (sourceArray.length - i));

    var temp = sourceArray[j];
    sourceArray[j] = sourceArray[i];
    sourceArray[i] = temp;
  }
  return sourceArray;
}

async function generateTeam(memberList) {

  memberList = shuffle(memberList)
  let totalStrategyA = 0;
  let totalStrategyB = 0;


  let teamA = [];
  let teamB = [];

  for (const member of memberList) {
    if (totalStrategyA <= totalStrategyB && teamA.length <= teamB.length) {
      teamA.push(member);
      totalStrategyA += member.strategy;
    } else {
      teamB.push(member);
      totalStrategyB += member.strategy;
    }
  }

  if (Math.abs(teamA.length - teamB.length) > 1 || Math.abs(totalStrategyA - totalStrategyB) > 10) {
    return generateTeam(memberList)
  } else {
    return { teamA, teamB, totalStrategyA, totalStrategyB }
  }
}