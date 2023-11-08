import "./Game.css";

import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

/*interface Entity {
    position: [number, number];
}

interface TouchEvent {
    type: string;
    id: string;
    delta: { pageX: number; pageY: number; };
}

interface Entities {
    [key: string]: Entity;
}

const MoveObject = (entities: Entities, { touches }: { touches: TouchEvent[] }) => {
    touches.filter(t => t.type === "move").forEach(t => {
        let object = entities[t.id];
        if (object && object.position) {
            object.position = [
                object.position[0] + t.delta.pageX,
                object.position[1] + t.delta.pageY
            ];
        }
    });

    return entities;
};

class App extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <GameEngine
                    systems={[MoveObject]}
                    entities={{
                        object: {
                            position: [0, 0],
                            renderer: <View style={styles.object} />
                        },
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    object: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
    },
});

export default App;
*/
const Game: React.FC = () => {
	return (
		<div className="game">
			<div className="pong">
				<div className="leftplayer"></div>
				<div className="rightplayer"></div>
				<div className="ball"></div>
			</div>
		</div>
	);
}

export default Game;