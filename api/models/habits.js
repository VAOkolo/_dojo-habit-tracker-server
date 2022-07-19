const { init } = require('../dbconfig')
const { ObjectId } = require('mongodb')

class Habit {
    constructor(data){
        this.id = data.id,
        this.content = data.content,
        this.email = data.email,
        this.dates = data.dates
    }

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init()
                // console.log("*************")
                // console.log(db)
                // console.log("*************")
                const habitData = await db.collection('habits').find().toArray()
                
                const habits = habitData.map(h => new Habit({...h, id: h._id}))
                resolve(habits);
            } catch (err) {
                console.log(err)
                reject("Error retrieving habit")
            }
        })
    }

    //creates new habit with empty dates array
    static create (content, email) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                const dates = []
                let habitData = await db.collection('habits').insertOne({content, email, dates})
                let newHabit = new Habit(habitData.ops[0])
                resolve(newHabit)
            } catch(err) {
                reject('Error creating habit')
            }
        })
    }

    //pulls in all habits under one email 
    static findByEmail (email) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let habitData = await db.collection('habits').find({"email": email }).toArray()
                console.log(habitData)
                // let habits = new Habit({...habitData[0], email: habitData[0].email});
                resolve (habitData);
            } catch (err) {
                reject('Habits not found');
            }
        });
    }

    //doesn't require email input
    static findByHabit (id, email) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                let habitData = await db.collection('habits').find({_id: ObjectId(id)}).toArray()
                let habits = new Habit({...habitData[0], id: habitData[0]._id});
                resolve (habits);
            } catch (err) {
                reject('Habits not found');
            }
        });
    }

    //date object doesn't require unique id (at least for now) as the date itself can function as it
    update(dates) {
        return new Promise (async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('habits').updateOne({_id: ObjectId(this.id)},
                                                            { $set: {dates: dates}})
                resolve("habit was updated");
                } catch (err) {
                console.log(err)
                reject(err, 'Error updating post');
            }
        });
    }

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const db = await init();
                await db.collection('habits').deleteOne({ _id: ObjectId(this.id) })
                resolve('Habit was deleted')
            } catch (err) {
                reject('Habit could not be deleted')
            }
        })
    }
}

module.exports = Habit
