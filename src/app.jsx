import React from 'react';
import ReactDOM from 'react-dom';

function Room(properties){

    var dop = properties.parameters.map(function(e){
        return <li>{e}</li>
    });

    return(
        <div className="room-box row">
                <div className="photo col-sm-4">
                    <img src={properties.url} alt=""/>
                </div>
                <div className="room-info col-sm-8">
                    <div className="info">
                        <h4>{properties.typeRoom}</h4>
                        <p>{properties.description}</p>
                        <ul className="info-list col-sm-8">
                            <li>Кількість кімнат: {properties.room}</li>
                            <li>{properties.typeBed}</li>
                            <li>Додадткові параметри
                                <ul>
                                    {dop}
                                </ul>
                            </li>
                        </ul>
                        <div className="room-price col-sm-4">
                            <h5>{properties.price} грн</h5>
                            <div className="room-btn">Забронювати номер</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            number: this.actionData(),
            options: {
                room:0,
                typeRoom:0,
                typeBed:0,
                price:0
            }
        }
    };

    actionData(){
        var req = new XMLHttpRequest();
        req.open('GET', 'src/number.json', false);
        req.send();
        return JSON.parse(req.response)
    }

    filterClick(e){
        if(e.target.options[e.target.selectedIndex] !== 0){
            var key = e.target.options[e.target.selectedIndex].dataset.type,
                option = e.target.options[e.target.selectedIndex].value.toString(),
                filterArr = this.state.options;
            filterArr[key] = option;

            if(key == 'price'){
                var price = filterArr[key].split('-'),
                minPrice = +price[0],
                maxPrice = +price[1];
            }

            this.setState({
                options: filterArr,     
                list: this.state.number.filter(function(e){
                            if( ((minPrice < e.price && maxPrice > e.price) || filterArr.price ==0)&&
                                ((filterArr.room == e.room) || filterArr.room ==0 ) &&
                                ((filterArr.typeRoom == e.typeRoom) || filterArr.typeRoom ==0 ) &&
                                ((filterArr.typeBed == e.typeBed) || filterArr.typeBed ==0) 
                            ){
                                return true;
                            }
                    })
            });
        }
        
    }

    render(){
        if(this.state.list){
            var rooms = this.state.list.map(function(e){
                var parameters = [],
                    item = 0;

                for(var key in e.parameters){
                    parameters[item] = e.parameters[key];
                    item ++;
                }

                return <Room 
                            parameters={e.parameters}
                            url={e.img}
                            typeRoom={e.typeRoom}
                            description={e.description}
                            room={e.room}
                            typeBed={e.typeBed}
                            parameters={parameters}
                            price={e.price}
                        />
            });
        }

        return (<div className="wrap">
                    <div className="menu-filter row">
                        <div className="block col-sm-3">
                            <label htmlFor="rooms">Кількість кімнат</label>
                            <select className="selects" name="room" id="rooms" onClick={this.filterClick.bind(this)}>
                                <option value="0" data-type="room">виберіть кількість</option>
                                <option value="1" data-type="room">1 - кімната</option>
                                <option value="2" data-type="room">2 - кімнати</option>
                                <option value="3" data-type="room">3 - кімнати</option>
                                <option value="4" data-type="room">4 - кімнати</option>
                                <option value="5" data-type="room">5 - кімнати</option>
                            </select>
                        </div>
                        <div className="block col-sm-3">
                            <label htmlFor="numbers">Тип номеру</label>
                            <select className="selects" name="typeNumber" id="numbers" onClick={this.filterClick.bind(this)}>
                                <option value="0" data-type="typeRoom">Виберіть тип</option>
                                <option value="Економ" data-type="typeRoom">Економ</option>
                                <option value="Люкс" data-type="typeRoom">Люкс</option>
                                <option value="Полулюкс" data-type="typeRoom">Полулюкс</option>
                                <option value="Дюплекс" data-type="typeRoom">Дюплес</option>
                                <option value="Сімейний" data-type="typeRoom">Сімейний</option>
                            </select>
                        </div>
                        <div className="block col-sm-3">
                            <label htmlFor="typeBed">Тип ліжка</label>
                            <select className="selects" name="TypeBed" id="typeBed" onClick={this.filterClick.bind(this)}>
                                <option value="0" data-type="typeBed">виберіть ліжко</option>
                                <option value="односпальне ліжко" data-type="typeBed">односпальне ліжко</option>
                                <option value="двоспальне ліжко" data-type="typeBed">двоспальне ліжко</option>
                            </select>
                        </div>
                        <div className="block col-sm-3">
                            <label htmlFor="price">цінова категорія</label>
                            <select className="selects" name="price" id="price" onClick={this.filterClick.bind(this)}>
                                <option value="0" data-type="price">виберіть ціну</option>
                                <option value="250-500" data-type="price">250-500 грн</option>
                                <option value="500-1000" data-type="price">500-1000 грн</option>
                                <option value="1000-1500" data-type="price">1000-1500 грн</option>
                                <option value="1500-2500" data-type="price">1500-2500 грн</option>
                                <option value="2500-3500" data-type="price">2500-3500 грн</option>
                            </select>
                        </div>
                    </div>
                    <div className="content">
                        {rooms}
                    </div>
                </div>
        )
    };
}

ReactDOM.render(
    <App></App>,
    document.getElementById('container')
)