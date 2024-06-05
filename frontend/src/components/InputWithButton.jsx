import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function InputWithButton() {
    return (
        <div className="flex items-center w-full max-w-sm space-x-2">
            <Input className="h-8 " type="input" placeholder="지역 또는 작성자명으로 검색" />
            <Button className="h-8" type="submit">
                검색
            </Button>
        </div>
    );
}
