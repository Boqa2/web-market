type Props = {
    tasks: string | undefined,
}
const TaskSlider = ({ tasks }: Props) => {
    return ( 
        <div className="border-2 border-[#ff6163] h-full z-[-999] mx-2 p-2 rounded-md">
            <img className="h-full" src={tasks}  alt=""  />
        </div>
     );
}
 
export default TaskSlider;