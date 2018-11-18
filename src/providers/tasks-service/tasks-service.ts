import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

@Injectable()
export class TasksServiceProvider {

    db: SQLiteObject = null;
   
    constructor( private sqlite: SQLite,) {
       
    }

    setDatabase(db: SQLiteObject){
        if(this.db === null){
            this.db = db;
        }
    }

    createTable(){
        let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
       
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {
          
          
              db.executeSql(sql, [])
                .then(() => console.log('Executed SQL'))
                .catch(e => console.log(e));
          
          
            })
            .catch(e => console.log(e));
    }

    getAll(){
        let sql = 'SELECT * FROM tasks';
        return this.db.executeSql(sql, [])
        
        .then(response => {
            let tasks = [];
            for(let index = 0; index < response.rows.lenght; index++) {
                tasks.push( response.rows.item(index) );
            }
            return Promise.resolve( tasks );
        })
        .catch(error => Promise.reject(error));
    }

    create(task: any){
        let sql = 'INSERT INTO tasks(title, completed) VALUES(?,?)';
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {
            db.executeSql(sql, [task.title, task.completed])
            .then(res => {
              console.log(res);
              this.getAll;
            })
            .catch(e => console.log(e));
          }).catch(e => console.log(e));
        
    }

    update(task: any){
        let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {
            db.executeSql(sql, [task.title, task.completed, task.id])
            .then(res => {
              console.log(res);
              this.getAll;
            })
            .catch(e => console.log(e));
          }).catch(e => console.log(e));
        
  
    }

    delete(task: any){
        let sql = 'DELETE FROM tasks WHERE id=?';
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {
            this.db.executeSql(sql, [task.id])
            .then(res => {
              console.log(res);
              this.getAll;
            })
            .catch(e => console.log(e));
          }).catch(e => console.log(e));
        }
    }




