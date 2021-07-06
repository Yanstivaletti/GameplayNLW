import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from './styles';
import { Guild,GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load'; 
import { api } from '../../services/api';


type Props = {
    handleGuildSelected: (guild: GuildProps) => void;
}
export function Guilds({handleGuildSelected}: Props){

    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }
    useEffect(() => {
        fetchGuilds();
    },[]);

    return(
        <View style = {styles.container}>
            {
            loading ? <Load/> :
            <FlatList
                data = {guilds}
                keyExtractor = {item => item.id}
                renderItem={({item}) => (
                    <Guild 
                    data = {item}
                    onPress = {() =>handleGuildSelected(item)} 
                    />
                )}
                ItemSeparatorComponent = {()=> <ListDivider isCentered/>}
                contentContainerStyle = {{paddingBottom: 68, paddingTop: 104}}
                ListHeaderComponent = {()=> <ListDivider isCentered/>}
                style = {styles.guilds}
            />
            }
        </View>
    );
}