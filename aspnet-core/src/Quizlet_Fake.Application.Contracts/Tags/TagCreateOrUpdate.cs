using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;


namespace Quizlet_Fake.Tags
{
   public class TagCreateOrUpdate
    {
        [Required]
        public string Name { get; set; }

        public int TagId { get; private set; }

        public TagCreateOrUpdate(int tagid, string nameCU)
        {
            this.TagId = tagid;
            this.Name = nameCU;
        }

    }
}
