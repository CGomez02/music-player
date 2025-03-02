import { PropsWithChildren } from 'react';
import { View } from 'react-native';

interface StopPropagationProps {
    
}

const StopPropagation: React.FC<StopPropagationProps> = ({children}: PropsWithChildren) => {
    return (
        <View 
            onStartShouldSetResponder={()=> true}
            onTouchEnd={(e) => e.stopPropagation()}
        >
            {children}
        </View>
    );
};

export default StopPropagation;