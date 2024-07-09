import { useDispatch } from 'react-redux';
import { completeTask, deleteTask } from '../reducers/tasks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Task.module.css';

function DrawerItem(props) {
  const dispatch = useDispatch();

//   return (
//     <div className={styles.task}>
//       <div className={styles.taskSection}>
//         <input type="checkbox" onClick={() => dispatch(completeTask(props.id))} checked={props.completed} className={styles.completeCheckbox} />
//         <p style={nameStyle}>{props.name}</p>
//         {props.urgent && <span className={styles.urgentBadge}>URGENT</span>}
//       </div>
//       <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deleteTask(props.id))} className={styles.delete} />
//     </div>
//   );

<List component="div" disablePadding key={props.id}>
<ListItemButton sx={{ pl: 4 }}>
<ListItemIcon>
    <ChecklistIcon />
  </ListItemIcon>
  <ListItemText primary={props.title} />
</ListItemButton>
</List>
}

export default DrawerItem;
