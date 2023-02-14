import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, Button } from 'react-native';
import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'int',
    name: 'string',
    status: 'string?',
    owner_id: 'string?',
  },
  primaryKey: '_id',
};

const TaskForm = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('Open');

  const saveTask = () => {
    Realm.open({
      path: 'myrealm',
      schema: [TaskSchema],
    })
      .then((realmInstance) => {
        let maxId = 0;
        const tasks = realmInstance.objects('Task');
        if (tasks.length > 0) {
          maxId = Math.max(...tasks.map(task => task._id));
        }
  
        realmInstance.write(() => {
          const newTask = realmInstance.create('Task', {
            _id: maxId + 1,
            name: taskName,
            status:status
          });
          console.log(`created task: ${newTask.name}`);
          console.log(`created status :${newTask.status}`)
          navigation.navigate('TaskList', { taskname: newTask.name });
        });
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Add Task</Text>
        <TextInput
          value={taskName}
          onChangeText={setTaskName}
          placeholder="Enter Task Name"
        />
        <TextInput
          value={status}
          onChangeText={setStatus}
          placeholder="Enter Task Status "
        />
        <Button title="Save Task" onPress={saveTask} />
      </View>
    
    </SafeAreaView>
  );
};

export default TaskForm;
