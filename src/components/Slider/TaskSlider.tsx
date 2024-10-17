type Props = {
    tasks: string,
}
const TaskSlider = ({ tasks }: Props) => {
    return ( 
        <li>
            <img src={tasks}  alt="" />
        </li>
     );
}
 
export default TaskSlider;