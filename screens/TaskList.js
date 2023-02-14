import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Realm from 'realm';

const TaskSchema = typeof TaskSchema === 'undefined' ? <View>
</View> : {
  name: 'Task',
  properties: {
    _id: 'int',
    name: 'string',
    status: 'string?',
    owner_id: 'string?',
  },
  primaryKey: '_id',
};

const TaskList = ({route}) => {
 const taskList=route.params.taskname
    const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (TaskSchema) {
      const realm = new Realm({ path: 'myrealm', schema: [TaskSchema] });
      setTasks(realm.objects('Task'));
    }
  }, []);

  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
            <View>
              <Text>{taskList}</Text>
              <Text>{item.status}</Text>
            </View>
        )}
      />
    </View>
  );
};

export default TaskList;
