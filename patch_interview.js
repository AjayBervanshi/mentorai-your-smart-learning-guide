import fs from 'fs';
let content = fs.readFileSync('src/components/InterviewScreen.tsx', 'utf8');

// Fix useCallback missing dependency and any types
content = content.replace(
  /const loadInterviewQuestions = async \(\) => \{/g,
  'const loadInterviewQuestions = async () => {'
);

// We'll wrap loadInterviewQuestions in useCallback and add it to the dependency array.
const oldEffect = `  useEffect(() => {
    if (!skill) return;
    loadInterviewQuestions();
  }, [skill?.name]);

  const loadInterviewQuestions = async () => {`;

const newEffect = `  const loadInterviewQuestions = async () => {`;

content = content.replace(oldEffect, newEffect);

const oldFunctionEnd = `    } catch (err) {
      console.error(err);
      toast.error("Failed to load interview questions");
    } finally {
      setLoading(false);
    }
  };`;

const newFunctionEnd = `    } catch (err) {
      console.error(err);
      toast.error("Failed to load interview questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!skill) return;
    loadInterviewQuestions();
  }, [skill]);`;

content = content.replace(oldFunctionEnd, newFunctionEnd);

fs.writeFileSync('src/components/InterviewScreen.tsx', content);
