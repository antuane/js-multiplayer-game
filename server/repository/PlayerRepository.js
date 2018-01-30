'use strict';

const mongoClient = require('mongodb').MongoClient;
const Config = require('../constants');

class RankingRepository {

    constructor() {
        this.ranking = [];
    }

    updatePlayer(player) {
        if(player){
            mongoClient.connect(Config.DATABASE.MONGODB_URI, (error, db) => {
                if (error) return;
                db.collection("players").update({ _id: player.id }, { $set: { _id: player.id, name: player.name, deaths: player.deaths, kills: player.kills }}, { upsert: true });
                db.close();
            })
        }
    }

    getRanking() {
        mongoClient.connect(Config.DATABASE.MONGODB_URI, (error, db) => {
            if (error) return;
            db.collection("players").find().sort( { kills: -1 } ).limit(10).toArray().then(data =>{
                this.ranking = data;
            });
            db.close();
        })

        return this.ranking;
    }

}

module.exports = RankingRepository;