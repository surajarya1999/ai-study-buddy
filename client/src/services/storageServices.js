const STORAGE_KEY = 'ai-study-buddy-flashcards'

export const getStoredTopics = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

export const saveFlashcards = (topic, flashcards) => {
  try {
    const existingTopics = getStoredTopics()
    const existingIndex = existingTopics.findIndex(t => t.topic === topic)
    
    const topicData = {
      topic,
      flashcards,
      date: new Date().toISOString()
    }

    if (existingIndex >= 0) {
      existingTopics[existingIndex] = topicData
    } else {
      existingTopics.push(topicData)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingTopics))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    throw new Error('Failed to save flashcards')
  }
}

export const deleteStoredTopic = (topic) => {
  try {
    const existingTopics = getStoredTopics()
    const filteredTopics = existingTopics.filter(t => t.topic !== topic)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTopics))
    return true
  } catch (error) {
    console.error('Error deleting from localStorage:', error)
    return false
  }
}

export const clearAllStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing localStorage:', error)
    return false
  }
}