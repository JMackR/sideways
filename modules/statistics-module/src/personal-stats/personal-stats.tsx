import { Margin } from '@upward/core-ui-library';
import { MilesCard } from './components/miles-card';
import { StepsCard } from './components/steps-card';
import { PersonalBestCard } from './components/personalbests-card';
import { AchievementsCard } from './components/achievements-card';
import { EngagementsCard } from './components/engagements-card';
import { FlatList } from 'react-native';
import { PlanProgress } from './components/plan-progress-card';
import { ArcSlider } from './components/progress2';

const cards = {
  miles: MilesCard,
  steps: StepsCard,
  personal_best: PersonalBestCard,
  achievement: AchievementsCard,
  engagement: EngagementsCard,
  progress: ArcSlider,
};
const CARD_LAYOUT = ['miles', 'steps', 'personal_best', 'achievement', 'engagement', 'progress'];

export const PersonalStats = () => {
  const stats = { period: 'June', miles: 29.3, steps: '11,874', records: 3 };

  const renderCards = ({ item, index }) => {
    const Card = cards[item];
    return (
      <Margin marginStep={2} key={index}>
        <Card stats={stats} />
      </Margin>
    );
  };

  return (
    <Margin marginLeftStep={2} marginRightStep={2}>
      <FlatList
        data={CARD_LAYOUT}
        renderItem={renderCards}
        contentContainerStyle={{ paddingBottom: 300, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </Margin>
  );
};
