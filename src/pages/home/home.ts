import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    tasks: any[] = [];

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public tasksService: TasksServiceProvider
    ) {}
    
    ionViewDidLoad() {
        this.getAllTasks;
      }
    
      ionViewWillEnter() {
     this.getAllTasks();
      }
    ionViewDidEnter(){
        this.getAllTasks();
    }

    getAllTasks(){
        this.tasksService.getAll()
        .then(tasks => {
            this.tasks = tasks;
        })
        .catch( error => {
            console.error( error );
        });
    }

    openAlertNewTask(){
        let alert = this.alertCtrl.create({
            title: 'Crear tarea',
            message: 'escribe el nombre de la tarea',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Digitar nueva tarea.',
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () =>{
                        console.log('cancelar');
                    }
                },
                {
                    text: 'Crear',
                    handler: (data)=>{
                        data.completed = false;
                        this.tasksService.create(data)
                        
                    }
                }
            ]
        });
        alert.present();
    }

    updateTask(task, index){
        task = Object.assign({}, task);
        task.completed = !task.completed;
        this.tasksService.update(task)
        
    }

    deleteTask(task: any, index){
        this.tasksService.delete(task)
     
    }

}
