import { CreateRunForm } from '@/components/createRunForm/CreateRunForm';
import { Run } from '@/stores/runsStore';
import { GameClient, Generation } from 'pokenode-ts';

export default async function CreateRun() {
    const gameApi = new GameClient();
    const generationCount = 9; // TODO: Move to some kind of settings.
    const generations: Generation[] = [];

    for (let i = 1; i <= generationCount; i++) {
        var res = await gameApi.getGenerationById(i);
        generations.push(res);
    }

    return <CreateRunForm generations={generations} />;
}
