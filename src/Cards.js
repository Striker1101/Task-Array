export default function Cards(props) {
  return (
    <div  className="cards" >
      <img className="cardsImg" src={props.item.img} alt={props.item.text} />
      <h5 className="cardsText">{props.item.text}</h5>
    </div>
  );
}
