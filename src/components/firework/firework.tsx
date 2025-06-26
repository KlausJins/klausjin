import { firework } from '@/utils'
import KlButton from '../ui/button'

export const Firework = () => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <KlButton isIconOnly onPress={() => firework()} className="text-lg h-9">
        <span>🎉</span>
      </KlButton>
      <div className="flex items-center gap-2 text-secondary dark:text-darksecondary">
        <span className="text-2xl">👈</span>
        <span>快来试试放烟花吧～</span>
      </div>
    </div>
  )
}
